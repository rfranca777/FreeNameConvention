; FreeNameConvention — NSIS custom macros
; Sets default installation directory to C:\FreeNameConvention

!macro preInit
  StrCpy $INSTDIR "C:\FreeNameConvention"
!macroend
