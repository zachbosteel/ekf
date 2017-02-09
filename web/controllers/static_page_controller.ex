defmodule Ekf.StaticPageController do
  use Ekf.Web, :controller

  alias Ekf.StaticPage

  def index(conn, _params) do
    static_pages = Repo.all(StaticPage)
    render(conn, "index.json", static_pages: static_pages)
  end

  # def new(conn, _params) do
  #   changeset = StaticPage.changeset(%StaticPage{})
  #   render(conn, "new.html", changeset: changeset)
  # end

  # def create(conn, %{"static_page" => static_page_params}) do
  #   changeset = StaticPage.changeset(%StaticPage{}, static_page_params)

  #   case Repo.insert(changeset) do
  #     {:ok, _static_page} ->
  #       conn
  #       |> put_flash(:info, "Static page created successfully.")
  #       |> redirect(to: static_page_path(conn, :index))
  #     {:error, changeset} ->
  #       render(conn, "new.html", changeset: changeset)
  #   end
  # end

  def show(conn, %{"id" => id}) do
    static_page = Repo.get!(StaticPage, id) |> Repo.preload(:texts) |> Repo.preload (:images)
    IO.puts("****************")
    IO.inspect(static_page)
    render(conn, "show.json", static_page: static_page)
  end

  # def edit(conn, %{"id" => id}) do
  #   static_page = Repo.get!(StaticPage, id)
  #   changeset = StaticPage.changeset(static_page)
  #   render(conn, "edit.html", static_page: static_page, changeset: changeset)
  # end

  # def update(conn, %{"id" => id, "static_page" => static_page_params}) do
  #   static_page = Repo.get!(StaticPage, id)
  #   changeset = StaticPage.changeset(static_page, static_page_params)

  #   case Repo.update(changeset) do
  #     {:ok, static_page} ->
  #       conn
  #       |> put_flash(:info, "Static page updated successfully.")
  #       |> redirect(to: static_page_path(conn, :show, static_page))
  #     {:error, changeset} ->
  #       render(conn, "edit.html", static_page: static_page, changeset: changeset)
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   static_page = Repo.get!(StaticPage, id)

  #   # Here we use delete! (with a bang) because we expect
  #   # it to always work (and if it does not, it will raise).
  #   Repo.delete!(static_page)

  #   conn
  #   |> put_flash(:info, "Static page deleted successfully.")
  #   |> redirect(to: static_page_path(conn, :index))
  # end
end
