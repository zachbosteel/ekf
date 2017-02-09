defmodule Ekf.TextViewTest do
  use Ekf.ModelCase
  import Ekf.Factory
  alias Ekf.TextView

  test "class_page_json" do
    text = insert(:text)

    rendered_text = TextView.text_json(text)

    assert rendered_text == %{
      body: text.body
    }
  end

  test "index.json" do
    text = insert(:text)

    rendered_texts = TextView.render("index.json", %{texts: [text]})

    assert rendered_texts == %{
      texts: [TextView.text_json(text)]
    }
  end

  test "show.json" do
    text = insert(:text)

    rendered_text = TextView.render("show.json", %{text: text})

    assert rendered_text == %{
      text: TextView.text_json(text)
    }
  end
end