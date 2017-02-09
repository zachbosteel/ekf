defmodule Ekf.StaticPageView do
  use Ekf.Web, :view

  import Ekf.TextView, only: [text_json: 1]
  import Ekf.ImageView, only: [image_json: 1]

  def render("index.json", %{static_pages: static_pages}) do
    %{
      static_pages: Enum.map(static_pages, &static_page_json/1)
    }
  end

  def render("show.json", %{static_page: static_page}) do
    %{
      static_page: static_page_json(static_page)
    }
  end

  def static_page_json(static_page) do
    %{
      title: static_page.title,
      texts: Enum.map(static_page.texts, &Ekf.TextView.text_json/1),
      images: Enum.map(static_page.images, &Ekf.ImageView.image_json/1)
    }
  end

end
