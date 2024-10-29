using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VentaProductos.Migrations
{
    /// <inheritdoc />
    public partial class MigrationsCliente : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreCliente = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ApellidoCliente = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Dni = table.Column<int>(type: "int", nullable: false),
                    Saldo = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Productos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreProducto = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    PrecioCompra = table.Column<float>(type: "real", nullable: false),
                    PrecioVenta = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Productos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ventas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FehcaVenta = table.Column<DateTime>(type: "datetime2", maxLength: 100, nullable: false),
                    Finalizada = table.Column<bool>(type: "bit", nullable: true),
                    IdCliente = table.Column<int>(type: "int", nullable: false),
                    RelacionDetalleVenta = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ventas", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropTable(
                name: "Productos");

            migrationBuilder.DropTable(
                name: "Ventas");
        }
    }
}
