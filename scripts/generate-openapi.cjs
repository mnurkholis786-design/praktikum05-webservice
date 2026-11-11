const fs = require("node:fs");
const path = require("node:path");

const openapi = {
  openapi: "3.0.3",
  info: {
    title: "Katalog Buku API",
    version: "1.0.0",
    description: "Dokumentasi REST API Manajemen Buku untuk Praktikum WSE",
  },
  servers: [{ url: "http://127.0.0.1:3200", description: "Server Lokal" }],
  paths: {
    "/api/buku": {
      get: {
        summary: "Mendapatkan daftar buku",
        parameters: [
          {
            in: "query",
            name: "q",
            schema: { type: "string" },
            description: "Kata kunci pencarian judul",
          },
        ],
        responses: { 200: { description: "Sukses" } },
      },
      post: {
        summary: "Menambahkan buku baru",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  judul: { type: "string" },
                  tersedia: { type: "boolean" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Buku ditambahkan" } },
      },
    },
    "/api/buku/{id}": {
      get: {
        summary: "Mendapatkan detail buku",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Sukses" },
          404: { description: "Tidak ditemukan" },
        },
      },
      put: {
        summary: "Memperbarui data buku",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  judul: { type: "string" },
                  tersedia: { type: "boolean" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Sukses diperbarui" } },
      },
      delete: {
        summary: "Menghapus buku",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: { 204: { description: "Sukses dihapus" } },
      },
    },
  },
};

const docPath = path.join(__dirname, "../docs/openapi.json");
fs.writeFileSync(docPath, JSON.stringify(openapi, null, 2));
console.log("Sukses: File openapi.json berhasil dibuat di folder docs!");
