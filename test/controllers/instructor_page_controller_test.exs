import Ekf.Factory

defmodule Ekf.InstructorPageControllerTest do
  use Ekf.ConnCase
  alias Ekf.InstructorPageView

  alias Ekf.InstructorPage
  @valid_attrs %{title: "some content"}
  @invalid_attrs %{}

  test "#index renders a list of instructor pages" do
    conn = build_conn()
    instructor_page = insert(:instructor_page)

    conn = get conn, instructor_page_path(conn, :index)

    assert json_response(conn, 200) == render_json(InstructorPageView, "index.json", instructor_pages: [instructor_page])
  end

  # test "renders form for new resources", %{conn: conn} do
  #   conn = get conn, instructor_page_path(conn, :new)
  #   assert html_response(conn, 200) =~ "New instructor page"
  # end

  # test "creates resource and redirects when data is valid", %{conn: conn} do
  #   conn = post conn, instructor_page_path(conn, :create), instructor_page: @valid_attrs
  #   assert redirected_to(conn) == instructor_page_path(conn, :index)
  #   assert Repo.get_by(InstructorPage, @valid_attrs)
  # end

  # test "does not create resource and renders errors when data is invalid", %{conn: conn} do
  #   conn = post conn, instructor_page_path(conn, :create), instructor_page: @invalid_attrs
  #   assert html_response(conn, 200) =~ "New instructor page"
  # end

  test "#show renders a single instructor_page" do
    conn = build_conn()
    instructor_page = insert(:instructor_page)
    %Ekf.Image{instructor_page_id: instructor_page.id, path: "/some/path", alt: "alt", label: "label", title: "title"}
      |> Ekf.Repo.insert!
    %Ekf.Text{instructor_page_id: instructor_page.id, body: "body", label: "label"}
      |> Ekf.Repo.insert!

    conn = get conn, instructor_page_path(conn, :show, instructor_page)

    final_instructor_page = instructor_page |> Ekf.Repo.preload(:texts) |> Ekf.Repo.preload(:images)
    assert json_response(conn, 200) == render_json(InstructorPageView, "show.json", instructor_page: final_instructor_page)
  end

  # test "renders page not found when id is nonexistent", %{conn: conn} do
  #   assert_error_sent 404, fn ->
  #     get conn, instructor_page_path(conn, :show, -1)
  #   end
  # end

  # test "renders form for editing chosen resource", %{conn: conn} do
  #   instructor_page = Repo.insert! %InstructorPage{}
  #   conn = get conn, instructor_page_path(conn, :edit, instructor_page)
  #   assert html_response(conn, 200) =~ "Edit instructor page"
  # end

  # test "updates chosen resource and redirects when data is valid", %{conn: conn} do
  #   instructor_page = Repo.insert! %InstructorPage{}
  #   conn = put conn, instructor_page_path(conn, :update, instructor_page), instructor_page: @valid_attrs
  #   assert redirected_to(conn) == instructor_page_path(conn, :show, instructor_page)
  #   assert Repo.get_by(InstructorPage, @valid_attrs)
  # end

  # test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
  #   instructor_page = Repo.insert! %InstructorPage{}
  #   conn = put conn, instructor_page_path(conn, :update, instructor_page), instructor_page: @invalid_attrs
  #   assert html_response(conn, 200) =~ "Edit instructor page"
  # end

  # test "deletes chosen resource", %{conn: conn} do
  #   instructor_page = Repo.insert! %InstructorPage{}
  #   conn = delete conn, instructor_page_path(conn, :delete, instructor_page)
  #   assert redirected_to(conn) == instructor_page_path(conn, :index)
  #   refute Repo.get(InstructorPage, instructor_page.id)
  # end
end
