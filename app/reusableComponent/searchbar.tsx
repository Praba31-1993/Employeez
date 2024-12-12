"use client";
import React, { useState } from "react";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import search from "/assets/img/search.svg";
import TextField from "@mui/material/TextField";
import Image from "next/image"; // Assuming you're using Next.js
import SearchIcon from "@mui/icons-material/Search"; // Optionally use an MUI icon
import "../reusableComponent/stylessheetforreusablecomponent.css";
import {
  createTheme,
  useTheme,
  ThemeProvider,
  Theme,
} from "@mui/material/styles";
import ImageComponent from "./image";

// Theme.ts
const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiAutocomplete: {
        defaultProps: {
          renderOption: (props, option, state, ownerState) => {
            const { key, ...optionProps } = props;
            return (
              <Box
                key={key}
                sx={{
                  borderRadius: "8px",
                  margin: "5px",
                  [`&.${autocompleteClasses.option}`]: {
                    padding: "8px",
                  },
                }}
                component="li"
                {...optionProps}
              >
                {ownerState.getOptionLabel(option)}
              </Box>
            );
          },
        },
      },
    },
  });

interface searchProps {
  list: any[];
}
export default function SearchBar({ list }: searchProps) {
  const [selectedFilm, setSelectedFilm] = useState<any | null>(null);

  const handleSearchChange = (
    event: React.SyntheticEvent,
    value: any | null
  ) => {
    setSelectedFilm(value);
  };

  return (
    <Stack spacing={5} sx={{ width: 300 }}>
      <Autocomplete
        options={list}
        getOptionLabel={(option: any) => `${option.title} (${option.year})`}
        id="movie-customized-option-demo"
        disableCloseOnSelect
        onChange={handleSearchChange}
        renderInput={(params) => (
          <div style={{ display: "flex", gap: "0.5em" }}>
            {/* <Image src={search} alt="" /> */}
            <ImageComponent width={15}  height={15} user={"/assets/img/search.svg"}/>

            <TextField
              {...params}
              label="Search"
              variant="standard"
              sx={{
                "& .MuiInput-underline:before": { borderBottom: "none" }, // Default state
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                }, // Hover state
                "& .MuiInput-underline:after": { borderBottom: "none" }, // Focused state
                "& .MuiSvgIcon-root": { width: 0, height: 0 },
                marginTop: "-15px",
                "& .MuiInput-input": {
                  fontSize: "12px",
                  fontFamily: "Inter",
                  color: "#707070",
                  marginTop: "6px",
                },
              }}
            />
          </div>
        )}
      />
    </Stack>
  );
}
