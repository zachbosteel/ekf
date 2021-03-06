defmodule Ekf.ClassPageViewTest do
  use Ekf.ModelCase
  import Ekf.Factory
  alias Ekf.ClassPageView

  test "class_page_json" do
    class_page = insert(:class_page)
      |> Ekf.Repo.preload(:texts)
      |> Ekf.Repo.preload(:images)

    rendered_class_page = ClassPageView.class_page_json(class_page)

    assert rendered_class_page == %{
      title: class_page.title,
      slug: class_page.slug,
      id: class_page.id,
      type: "classes",
      texts: [],
      images: []
    }
  end

  test "class_page_index_json" do
    class_page = insert(:class_page)
      |> Ekf.Repo.preload(:texts)
      |> Ekf.Repo.preload(:images)

    rendered_class_page = ClassPageView.class_page_index_json(class_page)

    assert rendered_class_page == %{
      title: class_page.title,
      slug: class_page.slug,
      id: class_page.id,
      type: "classes"
    }
  end

  test "index.json" do
    class_page = insert(:class_page)

    rendered_class_pages = ClassPageView.render("index.json", %{class_pages: [class_page]})

    assert rendered_class_pages == %{
      class_pages: [ClassPageView.class_page_index_json(class_page)]
    }
  end

  test "show.json" do
    class_page = insert(:class_page)
      |> Ekf.Repo.preload(:texts)
      |> Ekf.Repo.preload(:images)

    rendered_class_page = ClassPageView.render("show.json", %{class_page: class_page})

    assert rendered_class_page == %{
      class_page: ClassPageView.class_page_json(class_page)
    }
  end
end
