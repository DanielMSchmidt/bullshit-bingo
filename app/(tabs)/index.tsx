import * as React from "react";
import { View, StyleSheet, TouchableHighlight, TextInput, Text } from "react-native";

type State = {
    rows: Row[];
};

type Row = {
    cells: Cell[];
};

type Cell = {
    caption: string;
    checked: boolean;
};

function newState(size = 3): State {
    const s: State = { rows: [] };
    for (let i = 0; i < size; i++) {
        const row: Row = { cells: [] };
        for (let j = 0; j < size; j++) {
            const cell: Cell = {
                caption: "...",
                checked: false,
            };
            row.cells.push(cell);
        }
        s.rows.push(row);
    }
    return s;
}

function PlayCellRenderer({
    cell,
    setCellState,
}: {
    cell: Cell;
    setCellState: (cb: (s: Cell) => Cell) => void;
}) {
    const currentStyle = {
        backgroundColor: cell.checked ? "green" : "white",
    };

    return (
        <TouchableHighlight
            onPress={() => {
                setCellState((c) => ({ ...c, checked: !c.checked }));
            }}
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: 1,
            }}
        >
            <View
                style={{
                    ...currentStyle,
                    flex: 1,
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: "center",
                    }}
                >
                    {cell.caption}
                </Text>
            </View>
        </TouchableHighlight>
    );
}

function EditCellRenderer({
    cell,
    setCellState,
}: {
    cell: Cell;
    setCellState: (cb: (s: Cell) => Cell) => void;
}) {
    const [localContent, setLocalContent] = React.useState(cell.caption);

    const setCellContent = (text: string) => {
        setCellState((state: Cell) => {
            return { ...state, caption: text };
        });
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: 1,
            }}
        >
            <TextInput
                value={localContent}
                onChangeText={setLocalContent}
                onBlur={() => setCellContent(localContent)}
                style={{
                    fontSize: 20,
                    height: "100%",
                    width: "100%",
                    backgroundColor: "white",
                    textAlign: "center",
                }}
            />
        </View>
    );
}

export default function HomeScreen() {
    const [mode, setMode] = React.useState<"edit" | "play">("edit");
    const [gameState, setGameState] = React.useState<State>(newState());

    const innerContent =
        mode === "play" ? (
            <GridView state={gameState} setState={setGameState} RenderCell={PlayCellRenderer} />
        ) : (
            <GridView state={gameState} setState={setGameState} RenderCell={EditCellRenderer} />
        );

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>{innerContent}</View>
            <View style={{ height: 50 }}>
                <TouchableHighlight
                    onPress={() => setMode((mode) => (mode === "edit" ? "play" : "edit"))}
                    style={{
                        marginTop: 5,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            alignSelf: "center",
                            justifyContent: "center",
                            marginTop: 5,
                        }}
                    >
                        {mode === "edit" ? "Spielen" : "Bearbeiten"}
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

function GridView({
    state,
    setState,
    RenderCell,
}: {
    state: State;
    setState: (cb: (s: State) => State) => void;
    RenderCell: any;
}) {
    return (
        <View style={{ flexDirection: "row", width: "100%", height: "100%", flex: 1 }}>
            {state.rows.map((row, rowIndex) => (
                <View key={rowIndex} style={{ flexDirection: "column", flex: 1 }}>
                    {row.cells.map((cell, cellIndex) => (
                        <View key={cellIndex} style={{ flexDirection: "row", flex: 1 }}>
                            <RenderCell
                                cell={cell}
                                setCellState={(cb: (s: Cell) => Cell) => {
                                    setState((state) => {
                                        const current = state.rows[rowIndex].cells[cellIndex];
                                        const newCell = cb(current);
                                        state.rows[rowIndex].cells[cellIndex] = newCell;
                                        return { ...state };
                                    });
                                }}
                            />
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
