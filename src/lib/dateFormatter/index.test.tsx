import dateFormatter from ".";

describe("#dateFormatter", () => {
  it("returns correct date", () => {
    expect(dateFormatter("2022-06-20 17:55:49 UTC")).toBe("6/20/2022");
  });
});
