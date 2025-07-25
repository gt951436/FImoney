const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");
const authenticateToken = require("../middlewares/auth.js");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and inventory
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - sku
 *         - image_url
 *         - description
 *         - quantity
 *         - price
 *       properties:
 *         product_id:
 *           type: string
 *           format: uuid
 *           example: "8e48dfbc-2d7c-4f55-981f-3aa2e1ccf7a3"
 *         name:
 *           type: string
 *           example: "Smartphone"
 *         type:
 *           type: string
 *           example: "Electronics"
 *         sku:
 *           type: string
 *           example: "ELEC-1234"
 *         image_url:
 *           type: string
 *           format: uri
 *           example: "https://example.com/images/phone.jpg"
 *         description:
 *           type: string
 *           example: "Latest model with 128GB storage"
 *         quantity:
 *           type: integer
 *           example: 10
 *         price:
 *           type: number
 *           example: 499.99
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 */
// POST /products
router.post("/", authenticateToken, productController.addProduct);

/**
 * @swagger
 * /products/{product_id}/quantity:
 *   put:
 *     summary: Update product quantity
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
// PUT /products/:product_id/quantity
router.put(
  "/:product_id/quantity",
  authenticateToken,
  productController.updateQuantity
);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get paginated list of products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page (default 10)
 *     responses:
 *       200:
 *         description: Paginated products list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
// GET /products
router.get("/", authenticateToken, productController.getProducts);

module.exports = router;
