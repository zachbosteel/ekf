defmodule Ekf.Repo.Migrations.ChangeBodyColumnToText do
  use Ecto.Migration

  def change do
    alter table(:texts) do
      modify :body, :text
    end

  end
end
