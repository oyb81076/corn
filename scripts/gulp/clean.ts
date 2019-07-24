import del from "del";

export async function clean() {
  await del("build");
}
