defmodule Ekf.Repo.Migrations.AddSlugToPageTables do
  use Ecto.Migration

  def change do
    alter table(:class_page) do
      add :slug, :string
    end

    alter table(:instructor_page) do
      add :slug, :string
    end
  end
end
