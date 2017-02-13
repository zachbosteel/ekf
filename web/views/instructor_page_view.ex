defmodule Ekf.InstructorPageView do
  use Ekf.Web, :view

  import Ekf.TextView, only: [text_json: 1]
  import Ekf.ImageView, only: [image_json: 1]

  def render("index.json", %{instructor_pages: instructor_pages}) do
    %{
      instructor_pages: Enum.map(instructor_pages, &instructor_page_index_json/1)
    }
  end

  def render("show.json", %{instructor_page: instructor_page}) do
    %{
      instructor_page: instructor_page_json(instructor_page)
    }
  end

  def instructor_page_index_json(instructor_page) do
    %{
      id: instructor_page.id,
      title: instructor_page.title,
      slug: instructor_page.slug,
      type: "instructors",
    }
  end

  def instructor_page_json(instructor_page) do
    %{
      id: instructor_page.id,
      title: instructor_page.title,
      slug: instructor_page.slug,
      type: "instructors",
      texts: Enum.map(instructor_page.texts, &Ekf.TextView.text_json/1),
      images: Enum.map(instructor_page.images, &Ekf.ImageView.image_json/1)
    }
  end
end
