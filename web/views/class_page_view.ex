defmodule Ekf.ClassPageView do
  use Ekf.Web, :view

  import Ekf.TextView, only: [text_json: 1]
  import Ekf.ImageView, only: [image_json: 1]

  def render("index.json", %{class_pages: class_pages}) do
    %{
      class_pages: Enum.map(class_pages, &class_page_index_json/1)
    }
  end

  def render("show.json", %{class_page: class_page}) do
    %{
      class_page: class_page_json(class_page)
    }
  end

  def class_page_index_json(class_page) do
    %{
      id: class_page.id,
      title: class_page.title,
      slug: class_page.slug,
      type: "classes",
    }
  end

  def class_page_json(class_page) do
    %{
      id: class_page.id,
      title: class_page.title,
      slug: class_page.slug,
      type: "classes",
      texts: Enum.map(class_page.texts, &Ekf.TextView.text_json/1),
      images: Enum.map(class_page.images, &Ekf.ImageView.image_json/1)
    }
  end
end
