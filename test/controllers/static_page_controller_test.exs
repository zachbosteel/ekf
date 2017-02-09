import Ekf.Factory

defmodule Ekf.StaticPageControllerTest do
  use Ekf.ConnCase
  alias Ekf.StaticPageView

  alias Ekf.StaticPage
  @valid_attrs %{title: "some content"}
  @invalid_attrs %{}

  test "#index renders a list of static pages" do
    conn = build_conn()
    static_page = insert(:static_page)

    conn = get conn, static_page_path(conn, :index)

    assert json_response(conn, 200) == render_json(StaticPageView, "index.json", static_pages: [static_page])
  end

  # test "renders form for new resources", %{conn: conn} do
  #   conn = get conn, static_page_path(conn, :new)
  #   assert html_response(conn, 200) =~ "New static page"
  # end

  # test "creates resource and redirects when data is valid", %{conn: conn} do
  #   conn = post conn, static_page_path(conn, :create), static_page: @valid_attrs
  #   assert redirected_to(conn) == static_page_path(conn, :index)
  #   assert Repo.get_by(StaticPage, @valid_attrs)
  # end

  # test "does not create resource and renders errors when data is invalid", %{conn: conn} do
  #   conn = post conn, static_page_path(conn, :create), static_page: @invalid_attrs
  #   assert html_response(conn, 200) =~ "New static page"
  # end

  test "#show renders a single static_page" do
    conn = build_conn()
    static_page = insert(:static_page)

    conn = get conn, static_page_path(conn, :show, static_page)

    assert json_response(conn, 200) == render_json(StaticPageView, "show.json", static_page: static_page)
  end

  # test "renders page not found when id is nonexistent", %{conn: conn} do
  #   assert_error_sent 404, fn ->
  #     get conn, static_page_path(conn, :show, -1)
  #   end
  # end

  # test "renders form for editing chosen resource", %{conn: conn} do
  #   static_page = Repo.insert! %StaticPage{}
  #   conn = get conn, static_page_path(conn, :edit, static_page)
  #   assert html_response(conn, 200) =~ "Edit static page"
  # end

  # test "updates chosen resource and redirects when data is valid", %{conn: conn} do
  #   static_page = Repo.insert! %StaticPage{}
  #   conn = put conn, static_page_path(conn, :update, static_page), static_page: @valid_attrs
  #   assert redirected_to(conn) == static_page_path(conn, :show, static_page)
  #   assert Repo.get_by(StaticPage, @valid_attrs)
  # end

  # test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
  #   static_page = Repo.insert! %StaticPage{}
  #   conn = put conn, static_page_path(conn, :update, static_page), static_page: @invalid_attrs
  #   assert html_response(conn, 200) =~ "Edit static page"
  # end

  # test "deletes chosen resource", %{conn: conn} do
  #   static_page = Repo.insert! %StaticPage{}
  #   conn = delete conn, static_page_path(conn, :delete, static_page)
  #   assert redirected_to(conn) == static_page_path(conn, :index)
  #   refute Repo.get(StaticPage, static_page.id)
  # end
end
