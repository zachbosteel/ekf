defmodule Ekf.InstructorPageController do
  use Ekf.Web, :controller

  alias Ekf.InstructorPage

  def index(conn, _params) do
    instructor_pages = Repo.all(InstructorPage)
    render(conn, "index.json", instructor_pages: instructor_pages)
  end

  # def new(conn, _params) do
  #   changeset = InstructorPage.changeset(%InstructorPage{})
  #   render(conn, "new.html", changeset: changeset)
  # end

  def create(conn, params) do
    # break out params into separate maps
    instructor_page_params = get_instructor_params(params)

    # create instructor page
    changeset = InstructorPage.changeset(%InstructorPage{}, instructor_page_params)
    case Repo.insert(changeset) do
      {:ok, instructor_page} ->
        create_description(params, instructor_page.id)
        case params["pageImage"] do
          "" -> {:ok, "no image"}
          _ -> create_page_image(params, instructor_page.id)
        end
        render(conn, "ok.json", instructor_page: instructor_page)
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    instructor_page = Repo.get!(InstructorPage, id) |> Repo.preload(:texts) |> Repo.preload(:images)
    render(conn, "show.json", instructor_page: instructor_page)
  end

  # def edit(conn, %{"id" => id}) do
  #   instructor_page = Repo.get!(InstructorPage, id)
  #   changeset = InstructorPage.changeset(instructor_page)
  #   render(conn, "edit.html", instructor_page: instructor_page, changeset: changeset)
  # end

  def update(conn, params) do
    instructor_page = Repo.get!(InstructorPage, params["id"])
    changeset = InstructorPage.changeset(instructor_page, get_instructor_params(params))

    case Repo.update(changeset) do
      {:ok, instructor_page} ->
        update_description(params, instructor_page.id)
        update_page_image(params, instructor_page.id)
        render(conn, "ok.json", instructor_page: instructor_page)
      {:error, changeset} ->
        render(conn, "edit.html", instructor_page: instructor_page, changeset: changeset)
    end
  end

  # def delete(conn, %{"id" => id}) do
  #   instructor_page = Repo.get!(InstructorPage, id)

  #   # Here we use delete! (with a bang) because we expect
  #   # it to always work (and if it does not, it will raise).
  #   Repo.delete!(instructor_page)

  #   conn
  #   |> put_flash(:info, "Instructor page deleted successfully.")
  #   |> redirect(to: instructor_page_path(conn, :index))
  # end

  defp get_instructor_params(params) do
    %{title: params["title"], slug: params["slug"]}
  end

  defp get_description_params(params, id) do
    %{label: "instructor-page-description", body: params["description"], instructor_page_id: id}
  end

  defp get_page_img_params(params, img \\ %{image: ""}, id) do
    data = %{instructor_page_id: id, 
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

  defp create_page_image(params, id) do
    data = get_page_img_params(params, %{}, id)
    changeset = Ekf.Image.changeset(%Ekf.Image{}, data)
    {:ok, image} = Repo.insert(changeset)
    Repo.update(Ekf.Image.path_changeset(image, %{path: Ekf.ImageUploader.url({image.image, image})}))    
  end

  defp update_description(params, id) do
    query = from t in Ekf.Text, 
                      where: t.instructor_page_id == ^id,
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

  defp update_page_image(params, id) do
    query = from i in Ekf.Image, 
                where: i.instructor_page_id == ^id and i.label == "page-image",
                select: {i}
    old_image = Repo.all(query)
    {status, message} = verify_uniqueness(old_image)
    img = if is_nil(List.first(old_image)), do: nil, else: List.first(Tuple.to_list(List.first(old_image)))
    case status do
      :ok -> (img || %Ekf.Image{}) 
             |> Ekf.Image.changeset(get_page_img_params(params, id))
             |> Repo.insert_or_update() 
             |> recalculate_path()
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
    IO.puts("RECALCULARTING")
    Repo.update(Ekf.Image.path_changeset(image, %{path: Ekf.ImageUploader.url({image.image, image})}))
  end
end
