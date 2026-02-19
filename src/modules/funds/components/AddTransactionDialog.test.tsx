import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, test } from "vitest";
import {
  AddTransactionDialog,
  AddTransactionDialogProps,
} from "./AddTransactionDialog";

const addTransactionDialogMockProps: AddTransactionDialogProps = {
  fundId: "fundId",
  account: {
    _id: "123",
    name: "Some account name",
    balance: 1000,
  },
  updateFundBalance: () => {},
  updateAccountBalance: () => {},
  currentBalance: 1000,
};

describe("AddTransactionDialog", () => {
  beforeAll(() => {
    render(<AddTransactionDialog {...addTransactionDialogMockProps} />);
  });

  test("Add Transaction dialog trigger is rendered", () => {
    const addTransactionButton = screen.getByRole("button", { name: /add/i });
    expect(addTransactionButton).toBeVisible();
    expect(addTransactionButton).toBeEnabled();
  });

  test("Dialog is opened", async () => {
    const user = userEvent.setup();
    const addTransactionButton = screen.getByRole("button", { name: /add/i });

    await user.click(addTransactionButton);

    const addTransactionTitle = screen.getByRole("heading", {
      name: /add transaction/i,
      level: 2,
    });
    const addTransactionSubmitButton = screen.getByRole("button", {
      name: /add transaction/i,
    });
    const amountInput = screen.getByRole("textbox", { name: /amount/i });
    const currentBalanceDescription = screen.getByText(/current balance/i);

    expect(addTransactionTitle).toBeVisible();
    expect(addTransactionSubmitButton).toBeVisible();
    expect(amountInput).toBeVisible();
    expect(amountInput).toBeEnabled();
    expect(currentBalanceDescription).toBeVisible();
    expect(currentBalanceDescription).toHaveTextContent(/1000/i);
  });

  test("Dialog is closed with Cancel button and X button", async () => {
    const user = userEvent.setup();

    // Open dialog
    let addTransactionButton = screen.getByRole("button", { name: /add/i });
    await user.click(addTransactionButton);
    let addTransactionDialog = screen.getByRole("dialog");
    expect(addTransactionDialog).toBeVisible();

    // Close dialog with the Cancel button
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelButton);
    expect(addTransactionDialog).not.toBeVisible();
    expect(addTransactionDialog).not.toBeInTheDocument();

    // Open dialog again
    addTransactionButton = screen.getByRole("button", { name: /add/i });
    await user.click(addTransactionButton);
    addTransactionDialog = screen.getByRole("dialog");
    expect(addTransactionDialog).toBeVisible();

    // Close dialog with the Close button
    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);
    expect(addTransactionDialog).not.toBeVisible();
    expect(addTransactionDialog).not.toBeInTheDocument();
  });
});
