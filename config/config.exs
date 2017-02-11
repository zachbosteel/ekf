# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :ekf,
  ecto_repos: [Ekf.Repo]

# Configures the endpoint
config :ekf, Ekf.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "WYfI7WTNI5WSyRnk8oNdk8IDthCd71dDkT2Kj/fEhudzSfu6ZxZQbbSTRV/cA31B",
  render_errors: [view: Ekf.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Ekf.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]


# Configure Guardian Javascript Web Token Generator
config :guardian, Guardian,
  issuer: "Ekf",
  ttl: {30, :days},
  verify_issuer: true,
  serializer: Ekf.GuardianSerializer 

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
