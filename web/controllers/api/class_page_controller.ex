defmodule Ekf.ClassPageController do
  use Ekf.Web, :controller

  alias Ekf.ClassPage

  def index(conn, _params) do
    class_pages = Repo.all(ClassPage)
    render(conn, "index.json", class_pages: class_pages)
  end

  def new(conn, _params) do
    changeset = ClassPage.changeset(%ClassPage{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, params) do
    # break out params into separate maps
    class_page_params = get_class_params(params)

    # create class page
    changeset = ClassPage.changeset(%ClassPage{}, class_page_params)
    case Repo.insert(changeset) do
      {:ok, class_page} ->
        create_description(params, class_page.id)
        case params["galleryImage"] do
          "" -> {:ok, "no image"}
          _ -> create_gallery_image(params, class_page.id)
        end
        case params["pageImage"] do
          "" -> {:ok, "no image"}
          _ -> create_page_image(params, class_page.id)
        end
        conn
        |> redirect(to: class_page_path(conn, :index))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    class_page = Repo.get!(ClassPage, id) 
      |> Repo.preload(:texts) 
      |> Repo.preload(:images)
    render(conn, "show.json", class_page: class_page)
  end

  # def edit(conn, %{"id" => id}) do
  #   class_page = Repo.get!(ClassPage, id)
  #   changeset = ClassPage.changeset(class_page)
  #   render(conn, "edit.html", class_page: class_page, changeset: changeset)
  # end

  def update(conn, params) do
    class_page = Repo.get!(ClassPage, params["id"])
    changeset = ClassPage.changeset(class_page, get_class_params(params))

    case Repo.update(changeset) do
      {:ok, class_page} ->
        update_description(params, class_page.id)
        update_gallery_image(params, class_page.id)
        update_page_image(params, class_page.id)
        render(conn, "ok.json", class_page: class_page)
      {:error, changeset} ->
        render(conn, "edit.html", class_page: class_page, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    class_page = Repo.get!(ClassPage, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(class_page)

    render(conn, "ok.json", %{})
  end

  defp get_class_params(params) do
    %{title: params["title"], slug: params["slug"]}
  end

  defp get_description_params(params, id) do
    %{label: "class-page-description", body: params["description"], class_page_id: id}
  end

  defp get_gallery_img_params(params, img \\ %{image: ""}, id) do
    data = %{class_page_id: id, 
      label: "gallery-image", 
      image: params["galleryImage"], 
      title: params["galleryImageTitle"], 
      alt: params["galleryImageAlt"]}
    if data[:image] == "", do: Map.drop(data, [:image]), else: data
  end

  defp get_page_img_params(params, img \\ %{image: ""}, id) do
    data = %{class_page_id: id, 
      label: "page-image", 
      image: params["pageImage"], 
      title: params["pageImageTitle"], 
      alt: params["pageImageAlt"]}
    if data[:image] == "", do: Map.drop(data, [:image]), else: data
  end

  defp create_description(params, id) do
    data = get_description_params(params, id)
    changeset = Ekf.Text.changeset(%Ekf.Text{}, data)
    Repo.insert(changeset)
  end

  defp create_gallery_image(params, id) do
    data = get_gallery_img_params(params, %{}, id)
    changeset = Ekf.Image.changeset(%Ekf.Image{}, data)
    {:ok, image} = Repo.insert(changeset)
    Repo.update(Ekf.Image.path_changeset(image, %{path: Ekf.ImageUploader.url({image.image, image})}))
  end

  defp create_page_image(params, id) do
    data = get_page_img_params(params, %{}, id)
    changeset = Ekf.Image.changeset(%Ekf.Image{}, data)
    {:ok, image} = Repo.insert(changeset)
    Repo.update(Ekf.Image.path_changeset(image, %{path: Ekf.ImageUploader.url({image.image, image})}))    
  end

  defp update_description(params, id) do
    query = from t in Ekf.Text, 
                      where: t.class_page_id == ^id,
                      select: {t}
    old_description = Repo.all(query)
    {status, message} = verify_uniqueness(old_description)
    desc = if is_nil(List.first(old_description)), do: nil, else: List.first(Tuple.to_list(List.first(old_description)))
    case status do
      :ok -> desc || %Ekf.Text{} 
             |> Ekf.Text.changeset(get_description_params(params, id)) 
             |> Repo.insert_or_update
      :error -> IO.puts(message) 
    end
  end

  defp update_gallery_image(params, id) do
    query = from i in Ekf.Image, 
            where: i.class_page_id == ^id and i.label == "gallery-image",
            select: {i}
    old_image = Repo.all(query)
    {status, message} = verify_uniqueness(old_image)
    img = if is_nil(List.first(old_image)), do: nil, else: List.first(Tuple.to_list(List.first(old_image)))
    case status do
      :ok -> (img || %Ekf.Image{}) 
            |> Ekf.Image.changeset(get_gallery_img_params(params, img, id)) 
            |> Repo.insert_or_update 
            |> recalculate_path
      :error -> IO.puts(message)  
    end
  end

  defp update_page_image(params, id) do
    query = from i in Ekf.Image, 
                where: i.class_page_id == ^id and i.label == "page-image",
                select: {i}
    old_image = Repo.all(query)
    {status, message} = verify_uniqueness(old_image)
    img = if is_nil(List.first(old_image)), do: nil, else: List.first(Tuple.to_list(List.first(old_image)))
    case status do
      :ok -> (img || %Ekf.Image{}) 
             |> Ekf.Image.changeset(get_page_img_params(params, img, id)) 
             |> Repo.insert_or_update 
             |> recalculate_path
      :error -> IO.puts(message)  
    end
  end

  defp verify_uniqueness(record) do
    IO.puts("VERIFYING YO")
    case length(record) do
      0 -> {:ok, "No valid row retrieved"}
      1 -> {:ok, "Row uniqueness verified."}
      _ -> {:error, "More than one row matches query criteria"}
    end
  end

  defp recalculate_path({:ok, image} = tuple) do
    Repo.update(Ekf.Image.path_changeset(image, %{path: Ekf.ImageUploader.url({image.image, image})}))
  end
end
