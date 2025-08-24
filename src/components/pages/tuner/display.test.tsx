import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import Display from "./display";

test("basic render test", async () => {
  const { getByText } = render(
    <Display pitch={82} activeNote={{ name: "E", frequency: 82.41 }} />
  );

  await expect.element(getByText("E")).toBeInTheDocument();
  await expect.element(getByText("82.41")).toBeInTheDocument();
});

test("E tuning - match", async () => {
  const { getByTestId } = render(
    <Display pitch={82} activeNote={{ name: "E", frequency: 82.41 }} />
  );

  await expect.element(getByTestId("active-0")).toBeInTheDocument();
  await expect.element(getByTestId("inactive--1")).toBeInTheDocument();
  await expect.element(getByTestId("inactive-1")).toBeInTheDocument();
});

test("E tuning - one under", async () => {
  const { getByTestId } = render(
    <Display pitch={81} activeNote={{ name: "E", frequency: 82.41 }} />
  );

  await expect.element(getByTestId("inactive-0")).toBeInTheDocument();
  await expect.element(getByTestId("active--1")).toBeInTheDocument();
  await expect.element(getByTestId("inactive-1")).toBeInTheDocument();
});

test("E tuning - one over", async () => {
  const { getByTestId } = render(
    <Display pitch={83.5} activeNote={{ name: "E", frequency: 82.41 }} />
  );

  await expect.element(getByTestId("inactive-0")).toBeInTheDocument();
  await expect.element(getByTestId("inactive--1")).toBeInTheDocument();
  await expect.element(getByTestId("active-1")).toBeInTheDocument();
});

test("E tuning - four over", async () => {
  const { getByTestId } = render(
    <Display pitch={86.5} activeNote={{ name: "E", frequency: 82.41 }} />
  );

  await expect.element(getByTestId("inactive-3")).toBeInTheDocument();
  await expect.element(getByTestId("active-4")).toBeInTheDocument();
  await expect.element(getByTestId("inactive-5")).toBeInTheDocument();
});

test("E tuning - 10 over", async () => {
  const { getByTestId } = render(
    <Display pitch={92.42} activeNote={{ name: "E", frequency: 82.41 }} />
  );

  await expect.element(getByTestId("inactive-9")).toBeInTheDocument();
  await expect.element(getByTestId("active-10")).toBeInTheDocument();
  await expect.element(getByTestId("inactive-11")).toBeInTheDocument();
});

test("E tuning - lots over", async () => {
  const { getByTestId } = render(
    <Display pitch={100} activeNote={{ name: "E", frequency: 82.41 }} />
  );

  await expect.element(getByTestId("inactive-10")).toBeInTheDocument();
  await expect.element(getByTestId("active-11")).toBeInTheDocument();
});

test("E tuning - match - snapshot", async () => {
  const { container } = render(
    <Display pitch={82} activeNote={{ name: "E", frequency: 82.41 }} />
  );
  expect(container.innerHTML).toMatchSnapshot();
});

test("E tuning - three over - snapshot", async () => {
  const { container } = render(
    <Display pitch={85} activeNote={{ name: "E", frequency: 82.41 }} />
  );
  expect(container.innerHTML).toMatchSnapshot();
});

test("E tuning - lots over - snapshot", async () => {
  const { container } = render(
    <Display pitch={100} activeNote={{ name: "E", frequency: 82.41 }} />
  );
  expect(container.innerHTML).toMatchSnapshot();
});
