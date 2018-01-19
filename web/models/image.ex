defmodule Ekf.Image do
  use Ekf.Web, :model
  use Arc.Ecto.Schema

  schema "images" do
    belongs_to :static_page, Ekf.StaticPage
    belongs_to :class_page, Ekf.ClassPage
    belongs_to :instructor_page, Ekf.InstructorPage
    field :path, :string
    field :title, :string
    field :alt, :string
    field :label, :string
    field :image, Ekf.ImageUploader.Type

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    IO.puts "*)!*!)*!*)!*!*)!)*!)!*)*)!*)"
    IO.inspect cast_attachments(struct, params, [:image])
    struct
    |> cast_attachments(params, [:image])
    |> cast(params, [:path, :title, :alt, :image, :label, :static_page_id, :class_page_id, :instructor_page_id])
    |> validate_required([:title, :alt, :image, :label])
  end

  def path_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:path])
    |> validate_required([:path])
  end
end
