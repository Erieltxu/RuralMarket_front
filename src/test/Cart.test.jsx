import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Cart from "../components/cart/Cart";
import UseApi from "../../src/services/useApi";
import axios from "axios";

vi.mock("../../src/services/useApi");
vi.mock("axios");

describe("Cart Component", () => {
  const mockCartData = [
    {
      id: 1,
      items: [
        {
          id: 101,
          quantity: 2,
          product: {
            name: "Producto A",
            price: "10.00",
          },
        },
        {
          id: 102,
          quantity: 1,
          product: {
            name: "Producto B",
            price: "15.00",
          },
        },
      ],
    },
  ];

  beforeEach(() => {
    UseApi.mockReturnValue({ data: mockCartData, loading: false, error: null });
  });

  test("muestra la lista de productos en el carrito", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText("Carrito de compras")).toBeInTheDocument();
    expect(screen.getByText("Producto A")).toBeInTheDocument();
    expect(screen.getByText("Producto B")).toBeInTheDocument();
  });

  test("muestra el mensaje si el carrito está vacío", () => {
    UseApi.mockReturnValue({ data: [], loading: false, error: null });
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText("El carrito está vacío.")).toBeInTheDocument();
  });

  test("actualiza la cantidad de un producto", async () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const increaseButton = screen.getAllByRole("button", { name: "+" })[0];
    fireEvent.click(increaseButton);

    axios.put.mockResolvedValueOnce({ data: { success: true } });

    await waitFor(() => {
      expect(screen.getByText("Subtotal: 30.00 €")).toBeInTheDocument();
    });
  });

  test("elimina un producto del carrito", async () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const removeButton = screen.getAllByRole("button", { name: "Eliminar" })[0];
    fireEvent.click(removeButton);

    axios.delete.mockResolvedValueOnce({ data: { success: true } });

    await waitFor(() => {
      expect(screen.queryByText("Producto A")).not.toBeInTheDocument();
    });
  });
});
