import Ekf.Factory

defmodule Ekf.TextControllerTest do
  use Ekf.ConnCase
  alias Ekf.TextView

  alias Ekf.Text
  @valid_attrs %{body: "some content"}
  @invalid_attrs %{}

  test "#index renders a list of texts" do
    conn = build_conn()
    text = insert(:text)

    conn = get conn, text_path(conn, :index)

    assert json_response(conn, 200) == render_json(TextView, "index.json", texts: [text])
  end

  # test "renders form for new resources", %{conn: conn} do
  #   conn = get conn, text_path(conn, :new)
  #   assert html_response(conn, 200) =~ "New text"
  # end

  # test "creates resource and redirects when data is valid", %{conn: conn} do
  #   conn = post conn, text_path(conn, :create), text: @valid_attrs
  #   assert redirected_to(conn) == text_path(conn, :index)
  #   assert Repo.get_by(Text, @valid_attrs)
  # end

  # test "does not create resource and renders errors when data is invalid", %{conn: conn} do
  #   conn = post conn, text_path(conn, :create), text: @invalid_attrs
  #   assert html_response(conn, 200) =~ "New text"
  # end

  test "#show renders a single text" do
    conn = build_conn()
    text = insert(:text)

    conn = get conn, text_path(conn, :show, text)

    assert json_response(conn, 200) == render_json(TextView, "show.json", text: text)
  end

  # test "renders page not found when id is nonexistent", %{conn: conn} do
  #   assert_error_sent 404, fn ->
  #     get conn, text_path(conn, :show, -1)
  #   end
  # end

  # test "renders form for editing chosen resource", %{conn: conn} do
  #   text = Repo.insert! %Text{}
  #   conn = get conn, text_path(conn, :edit, text)
  #   assert html_response(conn, 200) =~ "Edit text"
  # end

  # test "updates chosen resource and redirects when data is valid", %{conn: conn} do
  #   text = Repo.insert! %Text{}
  #   conn = put conn, text_path(conn, :update, text), text: @valid_attrs
  #   assert redirected_to(conn) == text_path(conn, :show, text)
  #   assert Repo.get_by(Text, @valid_attrs)
  # end

  # test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
  #   text = Repo.insert! %Text{}
  #   conn = put conn, text_path(conn, :update, text), text: @invalid_attrs
  #   assert html_response(conn, 200) =~ "Edit text"
  # end

  # test "deletes chosen resource", %{conn: conn} do
  #   text = Repo.insert! %Text{}
  #   conn = delete conn, text_path(conn, :delete, text)
  #   assert redirected_to(conn) == text_path(conn, :index)
  #   refute Repo.get(Text, text.id)
  # end
end
