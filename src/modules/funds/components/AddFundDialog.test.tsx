import { queryByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, test } from "vitest";
import AddFundDialog from "./AddFundDialog";

describe("AddFundDialog", () => {
  beforeAll(() => {
    render(<AddFundDialog addFund={() => ""} />);
  });

  test("Add Fund dialog trigger is rendered", () => {
    const addFundButton = screen.getByRole("button", { name: /add fund/i });
    expect(addFundButton).toBeDefined();
  });

  test("Dialog is opened", async () => {
    const user = userEvent.setup();
    const addFundButton = screen.getByRole("button", { name: /add fund/i });

    // Assert dialog is closed
    const nullTitle = screen.queryByRole("heading", {
      level: 2,
      name: /add new fund/i,
    });
    expect(nullTitle).toBeNull();

    // Open dialog
    await user.click(addFundButton);

    // Assert dialog is open and has form
    const dialogTitle = screen.getByRole("heading", {
      level: 2,
      name: /add new fund/i,
    });
    const fundNameInput = screen.getByRole("textbox", { name: /fund name/i });
    expect(dialogTitle).toBeDefined();
    expect(fundNameInput).toBeDefined();
  });

  test("Dialog is closed after being opened with Cancel button", async () => {
    const user = userEvent.setup();

    // Open dialog
    const addFundButton = screen.getByRole("button", { name: /add fund/i });
    await user.click(addFundButton);

    // Asset dialog is open
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeDefined();

    // Click cancel button
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(cancelButton).toBeDefined();
    await user.click(cancelButton);

    // Assert dialog is closed
    const nullDialog = screen.queryByRole("dialog");
    expect(nullDialog).toBeNull();
  });

  test("Dialog is closed after being opened with X button", async () => {
    const user = userEvent.setup();

    // Open dialog
    const addFundButton = screen.getByRole("button", { name: /add fund/i });
    await user.click(addFundButton);

    // Asset dialog is open
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeDefined();

    // Click close button
    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton).toBeDefined();
    await user.click(closeButton);

    // Assert dialog is closed
    const nullDialog = screen.queryByRole("dialog");
    expect(nullDialog).toBeNull();
  });
});
