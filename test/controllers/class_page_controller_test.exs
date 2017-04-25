import Ekf.Factory

defmodule Ekf.ClassPageControllerTest do
  use Ekf.ConnCase
  alias Ekf.ClassPageView

  alias Ekf.ClassPage
  @valid_attrs %{title: "some content", slug: "some-slug"}
  @invalid_attrs %{}

  test "#index renders a list of class pages" do
    conn = build_conn()
    class_page = insert(:class_page)
    conn = get conn, class_page_path(conn, :index)

    assert json_response(conn, 200) == render_json(ClassPageView, "index.json", class_pages: [class_page])
  end

  # test "renders form for new resources", %{conn: conn} do
  #   conn = get conn, class_page_path(conn, :new)
  #   assert html_response(conn, 200) =~ "New class page"
  # end

  # test "creates resource and redirects when data is valid", %{conn: conn} do
  #   conn = post conn, class_page_path(conn, :create), class_page: @valid_attrs
  #   assert redirected_to(conn) == class_page_path(conn, :index)
  #   assert Repo.get_by(ClassPage, @valid_attrs)
  # end

  # test "does not create resource and renders errors when data is invalid", %{conn: conn} do
  #   conn = post conn, class_page_path(conn, :create), class_page: @invalid_attrs
  #   assert html_response(conn, 200) =~ "New class page"
  # end

  test "#show renders a single class_page" do    conn = build_conn()
    class_page = %ClassPage{title: "some title", slug: "some-title"} |> Ekf.Repo.insert!
    %Ekf.Image{class_page_id: class_page.id, path: "/some/path", alt: "alt", label: "label", title: "title"}
      |> Ekf.Repo.insert!
    %Ekf.Text{class_page_id: class_page.id, body: "body", label: "label"}
      |> Ekf.Repo.insert!

    conn = get conn, class_page_path(conn, :show, class_page)

    final_class_page = class_page |> Ekf.Repo.preload(:texts) |> Ekf.Repo.preload(:images)
    assert json_response(conn, 200) == render_json(ClassPageView, "show.json", class_page: final_class_page)
  end

  # test "renders page not found when id is nonexistent", %{conn: conn} do
  #   assert_error_sent 404, fn ->
  #     get conn, class_page_path(conn, :show, -1)
  #   end
  # end

  # test "renders form for editing chosen resource", %{conn: conn} do
  #   class_page = Repo.insert! %ClassPage{}
  #   conn = get conn, class_page_path(conn, :edit, class_page)
  #   assert html_response(conn, 200) =~ "Edit class page"
  # end

  # test "updates chosen resource and redirects when data is valid", %{conn: conn} do
  #   class_page = Repo.insert! %ClassPage{}
  #   conn = put conn, class_page_path(conn, :update, class_page), class_page: @valid_attrs
  #   assert redirected_to(conn) == class_page_path(conn, :show, class_page)
  #   assert Repo.get_by(ClassPage, @valid_attrs)
  # end

  # test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
  #   class_page = Repo.insert! %ClassPage{}
  #   conn = put conn, class_page_path(conn, :update, class_page), class_page: @invalid_attrs
  #   assert html_response(conn, 200) =~ "Edit class page"
  # end

  # test "deletes chosen resource", %{conn: conn} do
  #   class_page = Repo.insert! %ClassPage{}
  #   conn = delete conn, class_page_path(conn, :delete, class_page)
  #   assert redirected_to(conn) == class_page_path(conn, :index)
  #   refute Repo.get(ClassPage, class_page.id)
  # end
end
