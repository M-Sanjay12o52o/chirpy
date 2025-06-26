export function profaneRemove(str: string): string {
  const list_of_profane_words = ["kerfuffle", "sharbert", "fornax"];

  const str_split_to_words = str.split(" ");

  for (let i = 0; i < str_split_to_words.length; i++) {
    for (let j = 0; j < list_of_profane_words.length; j++) {
      if (
        str_split_to_words[i].toLowerCase() ==
        list_of_profane_words[j].toLowerCase()
      ) {
        str_split_to_words[i] = "****";
      }
    }
  }

  const result = str_split_to_words.join(" ");

  return result;
}

// let str =
//   "This kerfuffle is an OPINION I need to share with the World. sharbert fornax";

// const result = profaneRemove(str);

// console.log("resul: ", result);
