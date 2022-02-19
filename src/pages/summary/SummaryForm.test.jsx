import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "./SummaryForm";
import userEvent from "@testing-library/user-event";

describe("Summary Form", () => {
  test("checkbox is unchecked by default", () => {
    render(<SummaryForm />);
    const checkBox = screen.getByRole("checkbox", { name: /i agree/i });
    expect(checkBox).not.toBeChecked();
  });

  test("checking checkbox to enable button", () => {
    render(<SummaryForm />);
    const checkBox = screen.getByRole("checkbox", { name: /i agree/i });
    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    userEvent.click(checkBox);
    expect(confirmButton).toBeEnabled();
  });

  test("unchecking checkbox again disables button", () => {
    render(<SummaryForm />);
    const checkBox = screen.getByRole("checkbox", { name: /i agree/i });
    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    userEvent.click(checkBox);
    expect(confirmButton).toBeEnabled();

    userEvent.click(checkBox);
    expect(confirmButton).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    render(<SummaryForm />);
    const nullPopover = screen.queryByText(/no ice cream will/i);
    const termAndConditions = screen.getByText(/terms and conditions/i);

    expect(nullPopover).not.toBeInTheDocument();
    userEvent.hover(termAndConditions);

    const popover = screen.getByText(/no ice cream will /i);
    expect(popover).toBeInTheDocument();

    userEvent.unhover(termAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will/i)
    );
  });
});
