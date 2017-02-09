import Ekf.Factory

defmodule Ekf.ImageControllerTest do
  use Ekf.ConnCase
  alias Ekf.ImageView

  alias Ekf.Image
  @valid_attrs %{alt: "some content", path: "some content", title: "some content"}
  @invalid_attrs %{}

   test "#index renders a list of images" do
    conn = build_conn()
    image = insert(:image)

    conn = get conn, image_path(conn, :index)

    assert json_response(conn, 200) == render_json(ImageView, "index.json", images: [image])
  end

  # test "renders form for new resources", %{conn: conn} do
  #   conn = get conn, image_path(conn, :new)
  #   assert html_response(conn, 200) =~ "New image"
  # end

  # test "creates resource and redirects when data is valid", %{conn: conn} do
  #   conn = post conn, image_path(conn, :create), image: @valid_attrs
  #   assert redirected_to(conn) == image_path(conn, :index)
  #   assert Repo.get_by(Image, @valid_attrs)
  # end

  # test "does not create resource and renders errors when data is invalid", %{conn: conn} do
  #   conn = post conn, image_path(conn, :create), image: @invalid_attrs
  #   assert html_response(conn, 200) =~ "New image"
  # end

  test "#show renders a single image" do
    conn = build_conn()
    image = insert(:image)

    conn = get conn, image_path(conn, :show, image)

    assert json_response(conn, 200) == render_json(ImageView, "show.json", image: image)
  end

  # test "renders page not found when id is nonexistent", %{conn: conn} do
  #   assert_error_sent 404, fn ->
  #     get conn, image_path(conn, :show, -1)
  #   end
  # end

  # test "renders form for editing chosen resource", %{conn: conn} do
  #   image = Repo.insert! %Image{}
  #   conn = get conn, image_path(conn, :edit, image)
  #   assert html_response(conn, 200) =~ "Edit image"
  # end

  # test "updates chosen resource and redirects when data is valid", %{conn: conn} do
  #   image = Repo.insert! %Image{}
  #   conn = put conn, image_path(conn, :update, image), image: @valid_attrs
  #   assert redirected_to(conn) == image_path(conn, :show, image)
  #   assert Repo.get_by(Image, @valid_attrs)
  # end

  # test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
  #   image = Repo.insert! %Image{}
  #   conn = put conn, image_path(conn, :update, image), image: @invalid_attrs
  #   assert html_response(conn, 200) =~ "Edit image"
  # end

  # test "deletes chosen resource", %{conn: conn} do
  #   image = Repo.insert! %Image{}
  #   conn = delete conn, image_path(conn, :delete, image)
  #   assert redirected_to(conn) == image_path(conn, :index)
  #   refute Repo.get(Image, image.id)
  # end
end
