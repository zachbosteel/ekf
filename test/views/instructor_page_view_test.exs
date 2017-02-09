defmodule Ekf.InstructorPageViewTest do
  use Ekf.ModelCase
  import Ekf.Factory
  alias Ekf.InstructorPageView

  test "instructor_page_json" do
    instructor_page = insert(:instructor_page)

    rendered_instructor_page = InstructorPageView.instructor_page_json(instructor_page)

    assert rendered_instructor_page == %{
      title: instructor_page.title
    }
  end

  test "index.json" do
    instructor_page = insert(:instructor_page)

    rendered_instructor_pages = InstructorPageView.render("index.json", %{instructor_pages: [instructor_page]})

    assert rendered_instructor_pages == %{
      instructor_pages: [InstructorPageView.instructor_page_json(instructor_page)]
    }
  end

  test "show.json" do
    instructor_page = insert(:instructor_page)

    rendered_instructor_page = InstructorPageView.render("show.json", %{instructor_page: instructor_page})

    assert rendered_instructor_page == %{
      instructor_page: InstructorPageView.instructor_page_json(instructor_page)
    }
  end
end