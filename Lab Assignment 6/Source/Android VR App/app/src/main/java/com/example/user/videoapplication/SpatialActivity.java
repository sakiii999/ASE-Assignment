package com.example.user.videoapplication;

import java.util.*;


public class SpatialActivity {
    public abstract static class RenderingMode {

        /* Stereo panning of all sounds. This disables HRTF-based rendering. */
        public static final int STEREO_PANNING = 0;

        /* Renders all sounds over eight virtual loudspeakers arranged around
        the listener’s head. HRTF-based rendering is enabled. */
        public static final int BINAURAL_LOW_QUALITY = 1;

        /* Renders all sounds over 16 virtual loudspeakers arranged around
        the listener’s head. HRTF-based rendering is enabled. */
        public static final int BINAURAL_HIGH_QUALITY = 2;

    }


    static {
        System.loadLibrary("vraudio_engine");
    }

    public GvrAudioEngine(Context context, int renderingMode) {
        vrAudioSystemRef = nativeInitialize(getClass().getClassLoader(),
                context.getApplicationContext(),
                renderingMode);
    }

    private native long nativeInitialize(
            ClassLoader appClassLoader, Context applicationContext,
            int renderingMode);

    public void pause()
    {

    }

    public void resume()
    {

    }

    public void update()
    {

    }

    public abstract static class DistanceRolloffModel {

        /** Logarithmic distance rolloff model. */
        public static final int LOGARITHMIC = 0;

        /** Linear distance rolloff model. */
        public static final int LINEAR = 1;

        /** No distance rolloff will be applied. */
        public static final int NONE = 2;

    }

    public abstract static class MaterialName {

        /* Acoustically transparent material, reflects no sound. */
        public static final int TRANSPARENT = 0;

        /* Acoustic ceiling tiles, absorbs most frequencies. */
        public static final int ACOUSTIC_CEILING_TILES = 1;

        /* Bare brick, relatively reflective. */
        public static final int BRICK_BARE = 2;

        /* Painted brick. */
        public static final int BRICK_PAINTED = 3;

        /* Coarse surface concrete block. */
        public static final int CONCRETE_BLOCK_COARSE = 4;

        /* Painted concrete block. */
        public static final int CONCRETE_BLOCK_PAINTED = 5;

        /* Heavy curtains. */
        public static final int CURTAIN_HEAVY = 6;

        /* Fiberglass insulation. */
        public static final int FIBER_GLASS_INSULATION = 7;

        /* Thin glass. */
        public static final int GLASS_THIN = 8;

        /* Thick glass. */
        public static final int GLASS_THICK = 9;

        /* Grass. */
        public static final int GRASS = 10;

        /* Linoleum on concrete. */
        public static final int LINOLEUM_ON_CONCRETE = 11;

        /* Marble. */
        public static final int MARBLE = 12;

        /** Galvanized sheet metal. */
        public static final int METAL = 13;

        /* Wooden parquet on concrete. */
        public static final int PARQUET_ON_CONCRETE = 14;

        /* Rough plaster surface. */
        public static final int PLASTER_ROUGH = 15;

        /* Smooth plaster surface. */
        public static final int PLASTER_SMOOTH = 16;

        /* Plywood panel. */
        public static final int PLYWOOD_PANEL = 17;

        /* Polished concrete OR tile surface. */
        public static final int POLISHED_CONCRETE_OR_TILE = 18;

        /* Sheetrock. */
        public static final int SHEET_ROCK = 19;

        /* Surface of water or ice. */
        public static final int WATER_OR_ICE_SURFACE = 20;

        /* Wooden ceiling. */
        public static final int WOOD_CEILING = 21;

        /* Wood paneling. */
        public static final int WOOD_PANEL = 22;
    }
}
