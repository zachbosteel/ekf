defmodule Ekf.StaticPageViewTest do
  use Ekf.ModelCase
  import Ekf.Factory
  alias Ekf.StaticPageView

  test "static_page_json" do
    static_page = insert(:static_page)

    rendered_static_page = StaticPageView.static_page_json(static_page)

    assert rendered_static_page == %{
      title: static_page.title
    }
  end

  test "index.json" do
    static_page = insert(:static_page)

    rendered_static_pages = StaticPageView.render("index.json", %{static_pages: [static_page]})

    assert rendered_static_pages == %{
      static_pages: [StaticPageView.static_page_json(static_page)]
    }
  end

  test "show.json" do
    static_page = insert(:static_page)

    rendered_static_page = StaticPageView.render("show.json", %{static_page: static_page})

    assert rendered_static_page == %{
      static_page: StaticPageView.static_page_json(static_page)
    }
  end
end