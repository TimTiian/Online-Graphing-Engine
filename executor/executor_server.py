from flask import Flask
import docker
from docker.errors import APIError
from docker.errors import ImageNotFound



app = Flask(__name__)

IMAGE_NAME = 'thomas:1.0'
client = docker.from_env()


def load_image():
	try:
		client.images.get(IMAGE_NAME)
		print("image exists locally")
	except ImageNotFound:
		print("Image not found locally, loading from docker hub")
		client.image.pull(IMAGE_NAME)
	except APIError:
		print("Can't connect to docker")

	return


@app.route('/code_start', methods=['GET'])
def code_start():
	return "Hello Flagdream!"


if __name__ == '__main__':
	import sys
	port = int(sys.argv[1])
	load_image()
	app.run(port = port)