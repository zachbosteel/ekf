defmodule Ekf.ClassPageController do
  use Ekf.Web, :controller

  alias Ekf.ClassPage

  def index(conn, _params) do
    class_pages = Repo.all(ClassPage)
    render(conn, "index.json", class_pages: class_pages)
  end

  # def new(conn, _params) do
  #   changeset = ClassPage.changeset(%ClassPage{})
  #   render(conn, "new.html", changeset: changeset)
  # end

  # def create(conn, %{"class_page" => class_page_params}) do
  #   changeset = ClassPage.changeset(%ClassPage{}, class_page_params)

  #   case Repo.insert(changeset) do
  #     {:ok, _class_page} ->
  #       conn
  #       |> put_flash(:info, "Class page created successfully.")
  #       |> redirect(to: class_page_path(conn, :index))
  #     {:error, changeset} ->
  #       render(conn, "new.html", changeset: changeset)
  #   end
  # end

  def show(conn, %{"id" => id}) do
    class_page = Repo.get!(ClassPage, id) |> Repo.preload(:texts) |> Repo.preload(:images)
    render(conn, "show.json", class_page: class_page)
  end

  # def edit(conn, %{"id" => id}) do
  #   class_page = Repo.get!(ClassPage, id)
  #   changeset = ClassPage.changeset(class_page)
  #   render(conn, "edit.html", class_page: class_page, changeset: changeset)
  # end

  # def update(conn, %{"id" => id, "class_page" => class_page_params}) do
  #   class_page = Repo.get!(ClassPage, id)
  #   changeset = ClassPage.changeset(class_page, class_page_params)

  #   case Repo.update(changeset) do
  #     {:ok, class_page} ->
  #       conn
  #       |> put_flash(:info, "Class page updated successfully.")
  #       |> redirect(to: class_page_path(conn, :show, class_page))
  #     {:error, changeset} ->
  #       render(conn, "edit.html", class_page: class_page, changeset: changeset)
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   class_page = Repo.get!(ClassPage, id)

  #   # Here we use delete! (with a bang) because we expect
  #   # it to always work (and if it does not, it will raise).
  #   Repo.delete!(class_page)

  #   conn
  #   |> put_flash(:info, "Class page deleted successfully.")
  #   |> redirect(to: class_page_path(conn, :index))
  # end
end
