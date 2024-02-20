import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetWinesQuery } from "../../services/API";
import { Autocomplete, TextField } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { hyphenate } from "../../data/utils";
import { MAX_MOBILE_WIDTH } from "../../data/appData.json";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import useMobileView from "../../hooks/useMobileView";
import Img from "../Image";
import styles from "./AutoComplete.module.css";

type ACDataProps = {
  name: string;
  id: string;
  category: string;
  variety: string;
  packaging: string;
};

const AutoComplete = () => {
  const { data } = useGetWinesQuery();
  const [overlay, setOverlay] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const isMobileView: boolean = useMobileView(MAX_MOBILE_WIDTH);
  const navigate = useNavigate();

  if (data) {
    const ACData: ACDataProps[] = data.map(
      ({ name, id, category, variety, packaging }) => {
        return { name, id, category, variety, packaging };
      }
    );

    const handleClick = (): void => setOverlay(true);

    const handleBlur = (): void => setOverlay(false);

    const handleChange = (_, val: ACDataProps | null): void => {
      if (val) {
        const { category, variety, id } = val;
        setOverlay(false);
        setOpen(false);
        navigate(`/${category.toLowerCase()}/${hyphenate(variety)}/${id}`);
      }
    };

    const handleKeyDown = (e): void => {
      const {
        key,
        target: { value },
      } = e;

      if (key === "Enter" && value) {
        setOverlay(false);
        setOpen(false);
        navigate(`/search=${value}`);
      }
    };

    const handleInputChange = (_, val: string): void => {
      if (val.length <= 1) {
        if (open) setOpen(false);
      } else {
        if (!open) setOpen(true);
      }
    };

    return (
      <section className={styles.container}>
        <div className={overlay ? styles.overlay : ""}></div>
        <Autocomplete
          open={open}
          onChange={(e, value) => handleChange(e, value)}
          onInputChange={(_, value) => handleInputChange(_, value)}
          onKeyDown={(e) => handleKeyDown(e)}
          getOptionLabel={(option: ACDataProps) => option.name}
          className={`${styles.autoComplete} ${
            overlay ? styles.mobileView : ""
          }`}
          options={ACData}
          filterOptions={createFilterOptions({
            limit: 7,
          })}
          isOptionEqualToValue={(option, value) =>
            value === undefined || option.id === value.id
          }
          renderOption={(props, { id, name, packaging }, { inputValue }) => {
            const matches = match(name, inputValue);
            const parts = parse(name, matches);
            return (
              <li key={id} {...props} className={styles.listItem}>
                <div className={styles.itemCont}>
                  <div className={styles.itemImg}>
                    <Img
                      image={`wine/${id}.jpg`}
                      imageStyle={
                        packaging === "Bottle" ? "acBottle" : "acCask"
                      }
                      imageAlt={name}
                    />
                  </div>
                  <div className={styles.itemLabel}>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              label={isMobileView ? "Search" : "What are you looking for?"}
              {...params}
              className={styles.tf}
              onClick={handleClick}
              onBlur={handleBlur}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        ></Autocomplete>
      </section>
    );
  }
  return null;
};

export default AutoComplete;
