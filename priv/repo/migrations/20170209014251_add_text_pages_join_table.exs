defmodule Ekf.Repo.Migrations.AddTextPagesJoinTable do
  use Ecto.Migration

  def change do
    alter table(:texts) do
      add :static_page_id, :integer
      add :class_page_id, :integer
      add :instructor_page_id, :integer
      add :label, :string
    end

    alter table(:images) do
      add :static_page_id, :integer
      add :class_page_id, :integer
      add :instructor_page_id, :integer
    end
  end
end
