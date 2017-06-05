Shader "IsometricShooter/Decal Advanced" {
	Properties {
		_Color ("Main Color", Color) = (1,1,1,1)
		_GroundTex ("Ground (RGB)", 2D) = "white" {}
		_DecalTex ("Decal (RGB)", 2D) = "white" {}
		_DecalAlpha ("Alpha (A)", 2D) = "black" {}
	}

	SubShader {
		Tags { "RenderType"="Opaque" }
		LOD 200

		CGPROGRAM
		#pragma surface surf Lambert
		
		fixed4 _Color;
		sampler2D _GroundTex;
		sampler2D _DecalTex;
		sampler2D _DecalAlpha;

		struct Input {
			float2 uv_GroundTex;
			float2 uv_DecalTex;
			float2 uv_DecalAlpha;
		};

		void surf (Input IN, inout SurfaceOutput o) {
			fixed4 ground = tex2D(_GroundTex, IN.uv_GroundTex) * _Color;
			fixed4 decal = tex2D(_DecalTex, IN.uv_DecalTex) * _Color;
			fixed4 decalAlpha = tex2D(_DecalAlpha, IN.uv_DecalAlpha);
			o.Albedo = lerp (ground.rgb, decal.rgb, decalAlpha.a);
		}
		ENDCG
	}

	Fallback "Diffuse"
}