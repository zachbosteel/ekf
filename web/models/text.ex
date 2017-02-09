defmodule Ekf.Text do
  use Ekf.Web, :model

  schema "texts" do
    belongs_to :static_page, Ekf.StaticPage
    belongs_to :class_page, Ekf.ClassPage
    belongs_to :instructor_page, Ekf.InstructorPage
    field :body, :string
    field :label, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:body, :label, :static_page_id, :class_page_id, :instructor_page_id])
    |> validate_required([:body, :label])
  end
end
