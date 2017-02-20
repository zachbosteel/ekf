defmodule Ekf.Repo.Migrations.AddLabelToImage do
  use Ecto.Migration

  def change do
    alter table(:images) do
      add :label, :string
    end
  end
end
