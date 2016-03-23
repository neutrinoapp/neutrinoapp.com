serve:
	hugo server -w
deploy:
	hugo -d public
	goapp deploy app.yaml