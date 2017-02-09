defmodule Ekf.Repo.Migrations.CreateStaticPage do
  use Ecto.Migration

  def change do
    create table(:static_pages) do
      add :title, :string

      timestamps()
    end

  end
end
