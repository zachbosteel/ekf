defmodule Ekf.StaticPageController do
  use Ekf.Web, :controller

  alias Ekf.StaticPage

  def index(conn, _params) do
    static_pages = Repo.all(StaticPage)
    render(conn, "index.json", static_pages: static_pages)
  end

  def show(conn, %{"id" => id}) do
    static_page = Repo.get!(StaticPage, id) |> Repo.preload(:texts) |> Repo.preload(:images)
    render(conn, "show.json", static_page: static_page)
  end

  def update(conn, params) do
    IO.puts("UPDATING")
    # Get affected content ids
    text_ids = String.split(params["textIds"], ",")
    image_ids = String.split(params["imageIds"], ",")

    # Build queries, retrieve rows, and update
    case text_ids do
      [""] -> "No texts delivered."
      _ -> (from t in Ekf.Text, where: t.id in ^text_ids, select: {t})
           |> Repo.all()
           |> update_texts(params)
    end
    case image_ids do
      [""] -> "No images delivered."
      _ -> (from i in Ekf.Image, where: i.id in ^image_ids, select: {i})
           |> Repo.all()
           |> update_images(params)
    end

    # render an ok response
    render(conn, "ok.json", %{})
  end

  defp update_texts(texts, params) do
    Enum.map(texts, fn(wrapped_text) ->
      {text} = wrapped_text
      changeset = Ekf.Text.changeset(text, %{body: params[text.label]})
      Repo.update(changeset)
    end)
  end

  defp update_images(images, params) do
    Enum.map(images, fn(wrapped_image) ->
      {img} = wrapped_image
      data = %{title: params["#{img.label}-title"], 
               alt: params["#{img.label}-alt"], 
               image: params["#{img.label}-image"]}
      srubbed_data = if data[:image] == nil, do: Map.drop(data, [:image]), else: data
      changeset = Ekf.Image.changeset(img, srubbed_data)
      {:ok, new_img} = Repo.update(changeset)
      Repo.update(Ekf.Image.path_changeset(new_img, %{path: Ekf.ImageUploader.url({new_img.image, new_img})}))
    end)
  end
end
