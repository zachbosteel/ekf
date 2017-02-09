defmodule Ekf.ImageViewTest do
  use Ekf.ModelCase
  import Ekf.Factory
  alias Ekf.ImageView

  test "image_json" do
    image = insert(:image)

    rendered_image = ImageView.image_json(image)

    assert rendered_image == %{
      title: image.title,
      alt: image.alt,
      path: image.path
    }
  end

  test "index.json" do
    image = insert(:image)

    rendered_images = ImageView.render("index.json", %{images: [image]})

    assert rendered_images == %{
      images: [ImageView.image_json(image)]
    }
  end

  test "show.json" do
    image = insert(:image)

    rendered_image = ImageView.render("show.json", %{image: image})

    assert rendered_image == %{
      image: ImageView.image_json(image)
    }
  end
end