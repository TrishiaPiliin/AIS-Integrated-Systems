
igit:
	@echo "Igiting the project..."
	@git add .
	@git commit -m "$(m)"
	@git push
	@echo "Project igited successfully!"