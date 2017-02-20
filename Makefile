start:
	source /dev/stdin <<<"$(source .env)"
	mix phoenix.server

shell: 
	source /dev/stdin <<<"$(source .env)"
	iex -S mix phoenix.server
