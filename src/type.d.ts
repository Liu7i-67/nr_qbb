interface JSON {
  parse<T extends { parse?: { [key: string]: any } }>(
    value: T,
  ): T['parse'] | undefined;
}
