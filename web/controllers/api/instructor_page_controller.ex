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

  # def create(conn, %{"instructor_page" => instructor_page_params}) do
  #   changeset = InstructorPage.changeset(%InstructorPage{}, instructor_page_params)

  #   case Repo.insert(changeset) do
  #     {:ok, _instructor_page} ->
  #       conn
  #       |> put_flash(:info, "Instructor page created successfully.")
  #       |> redirect(to: instructor_page_path(conn, :index))
  #     {:error, changeset} ->
  #       render(conn, "new.html", changeset: changeset)
  #   end
  # end

  def show(conn, %{"id" => id}) do
    instructor_page = Repo.get!(InstructorPage, id) |> Repo.preload(:texts) |> Repo.preload(:images)
    render(conn, "show.json", instructor_page: instructor_page)
  end

  # def edit(conn, %{"id" => id}) do
  #   instructor_page = Repo.get!(InstructorPage, id)
  #   changeset = InstructorPage.changeset(instructor_page)
  #   render(conn, "edit.html", instructor_page: instructor_page, changeset: changeset)
  # end

  # def update(conn, %{"id" => id, "instructor_page" => instructor_page_params}) do
  #   instructor_page = Repo.get!(InstructorPage, id)
  #   changeset = InstructorPage.changeset(instructor_page, instructor_page_params)

  #   case Repo.update(changeset) do
  #     {:ok, instructor_page} ->
  #       conn
  #       |> put_flash(:info, "Instructor page updated successfully.")
  #       |> redirect(to: instructor_page_path(conn, :show, instructor_page))
  #     {:error, changeset} ->
  #       render(conn, "edit.html", instructor_page: instructor_page, changeset: changeset)
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   instructor_page = Repo.get!(InstructorPage, id)

  #   # Here we use delete! (with a bang) because we expect
  #   # it to always work (and if it does not, it will raise).
  #   Repo.delete!(instructor_page)

  #   conn
  #   |> put_flash(:info, "Instructor page deleted successfully.")
  #   |> redirect(to: instructor_page_path(conn, :index))
  # end
end
