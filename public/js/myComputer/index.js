$("#meucomputador").submit(function () {
  const data = this.serielize();
  console.log(data);

  return false;
});
