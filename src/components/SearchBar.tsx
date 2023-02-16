import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";

interface SearchBarProps {
    handleSearch: (e: any) => void;
    searchValueInputRef?: React.RefObject<HTMLInputElement>;
    searchValueChangeHandler: (e: any) => void
    searchValue: string;
    disableSearchIcon?: boolean;
    isSearchValueEmpty: boolean;
    placeholder?: string;
    id?:string;
    width?: any;
    height?: any;
}
const SearchBar = (props: SearchBarProps) => {
    const handleSearch = (e: any) => {
        if (!props.isSearchValueEmpty) {
            props.handleSearch(e)
        }
    }

    return (
        <div>
            <div style={{ position: "relative", display: "inline-block" }}>
                <Box 
                    component="form" 
                    onSubmit={
                        (e: any) => {
                            e.preventDefault()
                            handleSearch(e)
                        }
                    } noValidate
                    id={props.id}
                >
                    <SearchIcon
                        style={{
                            position: "absolute",
                            right: 7,
                            top: 7,
                            width: 30,
                            height: 30,
                        }}
                        onClick={(e: any) => {
                            if (!(props.isSearchValueEmpty || props.disableSearchIcon)) handleSearch(e)
                        }}
                        sx={{
                            color: (props.isSearchValueEmpty || props.disableSearchIcon) ? "#D3D3D3" : "#39A2DB",
                            fontSize: 30,
                            cursor: (props.isSearchValueEmpty || props.disableSearchIcon) ? "" : "pointer",
                        }}
                    />

                    <input
                        ref={props.searchValueInputRef}
                        type="text"
                        style={{
                            background: "#F1F0F5",
                            borderRadius: "24px",
                            height: props.height ?? "42px",
                            width: props.width ?? "300px",
                            padding: "10px",
                            border: "none",
                            outline: "none",
                            zIndex: 1,
                            textIndent: 10,
                        }}
                        value={props.searchValue}
                        onChange={props.searchValueChangeHandler}
                        onKeyDown={(e: any) => {
                            if (e.key === 'Enter') {
                                handleSearch(e)
                            }
                        }}
                        placeholder={props.placeholder}
                    />
                </Box>
            </div>
        </div>
    );
}


export default SearchBar;
