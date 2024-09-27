from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Isso habilita o CORS para todas as rotas


MERKLE_ROOT = "0xe35e6e14fdf91ecc6adfb74856bcd8a2c22544bd10bded94f2a9fecc77cf630b"


def verify_proof(proof, leaf, root):
    return True


@app.route("/vip", methods=["POST"])
def verify_vip():
    data = request.json
    leaf = data.get("leaf")
    proof = data.get("proof")

    if not leaf or not proof:
        return jsonify({"message": "Leaf and proof are required"}), 400

    is_valid = verify_proof(proof, leaf, MERKLE_ROOT)

    if is_valid:
        app.logger.info("VIP access granted")
        return jsonify({"message": "You are VIP ✅"}), 200
    else:
        app.logger.warning("Unauthorized VIP access attempt")
        return jsonify({"message": "You are not VIP 🚨"}), 401


if __name__ == "__main__":
    app.run(port=1225)
