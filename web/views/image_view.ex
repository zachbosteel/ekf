defmodule Ekf.ImageView do
  use Ekf.Web, :view

  def render("index.json", %{images: images}) do
    %{
      images: Enum.map(images, &image_json/1)
    }
  end

  def render("show.json", %{image: image}) do
    %{
      image: image_json(image)
    }
  end

  def render("create.json", %{}) do
    %{status: "ok"}
  end

  def render("gallery.json", %{images: images}) do
    %{
      images: Enum.map(images, &clean_image/1)
    }
  end

  def clean_image(image) do
    {img} = image
    image_json(img)
  end

  def image_json(image) do
    cond do
      is_nil(image) -> nil
      true -> %{title: image.title, path: image.path, alt: image.alt, label: image.label, id: image.id}
    end
  end
end
