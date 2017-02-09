defmodule Ekf.TextView do
  use Ekf.Web, :view

  def render("index.json", %{texts: texts}) do
    %{
      texts: Enum.map(texts, &text_json/1)
    }
  end

  def render("show.json", %{text: text}) do
    %{
      text: text_json(text)
    }
  end

  def text_json(text) do
    cond do
      is_nil(text) -> nil
      true -> %{body: text.body, label: text.label}
    end
    
  end

end
